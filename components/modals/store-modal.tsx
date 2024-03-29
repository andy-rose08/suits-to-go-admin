"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import {
  FieldValues,
  UseFormReturn,
  FieldPath,
  PathValue,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const locationData = {
  "San José": {
    cantons: ["Cantón 1", "Cantón 2"],
    districts: {
      "Cantón 1": ["Distrito 1", "Distrito 2"],
      "Cantón 2": ["Distrito 3", "Distrito 4"],
    },
  },
  Alajuela: {
    cantons: ["Cantón 3", "Cantón 4"],
    districts: {
      "Cantón 3": ["Distrito 5", "Distrito 6"],
      "Cantón 4": ["Distrito 7", "Distrito 8"],
    },
  },
  // Agrega aquí las demás provincias
};

const formSchema = z.object({
  name: z.string().nonempty("Store name is required"),
  address: z.string().nonempty("Store address is required"),
  province: z.string(),
  canton: z.string(),
  district: z.string(),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      province: "",
      canton: "",
      district: "",
    },
  });

  const locationData: {
    [key: string]: {
      cantons: string[];
      districts: { [key: string]: string[] };
    };
  } = {
    "San José": {
      cantons: ["Cantón 1", "Cantón 2"],
      districts: {
        "Cantón 1": ["Distrito 1", "Distrito 2"],
        "Cantón 2": ["Distrito 3", "Distrito 4"],
      },
    },
    Alajuela: {
      cantons: ["Cantón 3", "Cantón 4"],
      districts: {
        "Cantón 3": ["Distrito 5", "Distrito 6"],
        "Cantón 4": ["Distrito 7", "Distrito 8"],
      },
    },
    // Add other provinces here
  };

  const province = form.watch("province");
  const canton = form.watch("canton");

  const cantons = province ? locationData[province].cantons : [];
  const districts =
    province && canton ? locationData[province].districts[canton] : [];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO: Create the store
    console.log({ values });
  };

  const handleProvinceChange =
    <TFieldValues extends FieldValues>(
      form: UseFormReturn<TFieldValues>,
      field: FieldPath<TFieldValues>
    ) =>
    (value: TFieldValues[FieldPath<TFieldValues>]) => {
      form.setValue(
        "canton" as FieldPath<TFieldValues>,
        "" as PathValue<TFieldValues, FieldPath<TFieldValues>>
      );
      form.setValue(
        "district" as FieldPath<TFieldValues>,
        "" as PathValue<TFieldValues, FieldPath<TFieldValues>>
      );
      form.setValue(field, value);
    };

  return (
    <Modal
      title="Add a new Store"
      description="Add a new store for manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      {/*manejo de errores */}
                      <Input placeholder="Store Name" {...field} />
                    </FormControl>
                    <FormMessage /> {/*muestra los errores */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Store Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select
                      onValueChange={handleProvinceChange(form, field.name)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="San José">San José</SelectItem>
                        <SelectItem value="Alajuela">Alajuela</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {province && (
                <FormField
                  control={form.control}
                  name="canton"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canton</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a canton" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cantons.map((canton: string) => (
                            <SelectItem key={canton} value={canton}>
                              {canton}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {canton && (
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distrito</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
